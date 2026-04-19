<?php
namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/products')]
class ProductController extends AbstractController
{
    private function formatProduct(Product $product): array
    {
        return [
            'ref' => $product->getRef(),
            'title' => $product->getTitle(),
            'price' => $product->getPrice(),
            'description' => $product->getDescription(),
            'category' => $product->getCategory(),
            'image' => $product->getImage(),
            'rating' => [
                'rate' => $product->getRatingRate(),
                'count' => $product->getRatingCount(),
            ],
        ];
    }

    #[Route('', name: 'products_list', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $products = $em->getRepository(Product::class)->findAll();
        return $this->json(array_map([$this, 'formatProduct'], $products), 200);
    }

    #[Route('/{ref}', name: 'products_show', methods: ['GET'])]
    public function show(string $ref, EntityManagerInterface $em): JsonResponse
    {
        $product = $em->getRepository(Product::class)->findOneBy(['ref' => "prd_$ref"]);

        if (!$product) {
            return $this->json(['error' => 'Produit introuvable'], 404);
        }

        return $this->json($this->formatProduct($product), 200);
    }

    #[Route('', name: 'products_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        if (!$this->isGranted('ROLE_PRODUCER') && !$this->isGranted('ROLE_ADMIN')) {
            return $this->json(['error' => 'Accès interdit'], 403);
        }

        $data = json_decode($request->getContent(), true);

        $required = ['title', 'price', 'description', 'category'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || $data[$field] === '') {
                return $this->json(['error' => "Le champ $field est requis"], 400);
            }
        }

        if (!is_numeric($data['price']) || $data['price'] <= 0) {
            return $this->json(['error' => 'Le champ price doit être supérieur à 0'], 400);
        }

        $currentUser = $this->getUser();
        $product = new Product();
        $product->setTitle($data['title'])
            ->setPrice((float) $data['price'])
            ->setDescription($data['description'])
            ->setCategory($data['category'])
            ->setImage($data['image'] ?? null)
            ->setProducer($currentUser)
            ->setRatingRate(0)
            ->setRatingCount(0);

        $em->persist($product);
        $em->flush();

        return $this->json($this->formatProduct($product), 201);
    }
}