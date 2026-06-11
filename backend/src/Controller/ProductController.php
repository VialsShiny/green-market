<?php
namespace App\Controller;

use App\Entity\Product;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/products')]
#[OA\Tag(name: 'Products')]
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

    #[OA\Get(
        path: '/api/products',
        summary: 'Lister les produits',
        tags: ['Products'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Liste des produits',
                content: new OA\JsonContent(type: 'array', items: new OA\Items(
                    properties: [
                        new OA\Property(property: 'ref', type: 'string'),
                        new OA\Property(property: 'title', type: 'string'),
                        new OA\Property(property: 'price', type: 'number'),
                        new OA\Property(property: 'category', type: 'string'),
                    ]
                ))
            ),
        ]
    )]
    #[Route('', name: 'products_list', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $products = $em->getRepository(Product::class)->findAll();
        return $this->json(array_map([$this, 'formatProduct'], $products), 200);
    }

    #[OA\Get(
        path: '/api/products/{ref}',
        summary: 'Détail d\'un produit',
        tags: ['Products'],
        parameters: [
            new OA\Parameter(name: 'ref', in: 'path', required: true, schema: new OA\Schema(type: 'string')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Détail produit'),
            new OA\Response(response: 404, description: 'Produit introuvable'),
        ]
    )]
    #[Route('/{ref}', name: 'products_show', methods: ['GET'])]
    public function show(string $ref, EntityManagerInterface $em): JsonResponse
    {
        $product = $em->getRepository(Product::class)->findOneBy(['ref' => "prd_$ref"]);

        if (!$product) {
            return $this->json(['error' => 'Produit introuvable'], 404);
        }

        return $this->json($this->formatProduct($product), 200);
    }

    #[OA\Post(
        path: '/api/products',
        summary: 'Créer un produit',
        tags: ['Products'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['title', 'price', 'description', 'category'],
                properties: [
                    new OA\Property(property: 'title', type: 'string', example: 'Produit A'),
                    new OA\Property(property: 'price', type: 'number', example: 29.99),
                    new OA\Property(property: 'description', type: 'string'),
                    new OA\Property(property: 'category', type: 'string', example: 'Electronics'),
                    new OA\Property(property: 'image', type: 'string', nullable: true),
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: 'Produit créé'),
            new OA\Response(response: 400, description: 'Erreur validation'),
            new OA\Response(response: 403, description: 'Accès interdit'),
        ]
    )]
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

        $currentUser = $em->getRepository(User::class)->findOneBy(['id' => $this->getUser()]);
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
