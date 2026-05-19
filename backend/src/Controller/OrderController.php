<?php
namespace App\Controller;

use App\Entity\Order;
use App\Entity\OrderItem;
use App\Entity\Product;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/orders')]
class OrderController extends AbstractController
{
    private function formatOrder(Order $order): array
    {
        return [
            'ref' => $order->getRef(),
            'userId' => $order->getUser()->getId(),
            'date' => $order->getCreationDate()->format('Y-m-d'),
            'products' => array_map(fn($item) => [
                'productId' => $item->getProduct()->getId(),
                'quantity' => $item->getQuantity(),
            ], $order->getItems()->toArray()),
            'total' => (float) $order->getTotalPrice(),
        ];
    }

    #[Route('', name: 'orders_list', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $currentUser = $this->getUser();

        if ($this->isGranted('ROLE_ADMIN')) {
            $orders = $em->getRepository(Order::class)->findAll();
        } else {
            $orders = $em->getRepository(Order::class)->findBy(['user' => $currentUser]);
        }

        return $this->json(array_map([$this, 'formatOrder'], $orders), 200);
    }

    #[Route('/{ref}', name: 'orders_show', methods: ['GET'])]
    public function show(string $ref, EntityManagerInterface $em): JsonResponse
    {
        $order = $em->getRepository(Order::class)->findOneBy(['ref' => "ord_$ref"]);

        if (!$order) {
            return $this->json(['error' => 'Commande introuvable'], 404);
        }

        $currentUser = $em->getRepository(User::class)->findOneBy(['id' => $this->getUser()]);
        if (!$this->isGranted('ROLE_ADMIN') && $order->getUser()->getId() !== $currentUser->getId()) {
            return $this->json(['error' => 'Accès interdit'], 403);
        }

        return $this->json($this->formatOrder($order), 200);
    }

    #[Route('', name: 'orders_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['products']) || !is_array($data['products'])) {
            return $this->json(['error' => 'La commande doit contenir au moins un produit'], 400);
        }

        $currentUser = $em->getRepository(User::class)->findOneBy(['id' => $this->getUser()]);

        $order = new Order();
        $order->setUser($currentUser);

        $total = 0;

        foreach ($data['products'] as $line) {
            if (empty($line['productId']) || empty($line['quantity'])) {
                return $this->json(['error' => 'Chaque ligne doit avoir productId et quantity'], 400);
            }

            if (!is_int($line['quantity']) || $line['quantity'] <= 0) {
                return $this->json(['error' => 'La quantité doit être un entier strictement positif'], 400);
            }

            $product = $em->getRepository(Product::class)->find($line['productId']);
            if (!$product) {
                return $this->json(['error' => "Produit {$line['productId']} introuvable"], 404);
            }

            $item = new OrderItem();
            $item->setProduct($product)
                ->setQuantity($line['quantity'])
                ->setUnitPrice($product->getPrice());

            $order->addItem($item);
            $total += (float) $product->getPrice() * $line['quantity'];
        }

        $order->setTotalPrice(round($total, 2));

        $em->persist($order);
        $em->flush();

        return $this->json($this->formatOrder($order), 201);
    }
}