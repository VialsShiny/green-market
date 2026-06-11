<?php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/users')]
#[OA\Tag(name: 'Users')]
class UserController extends AbstractController
{
    private function formatUser(User $user): array
    {
        return [
            'ref' => $user->getRef(),
            'name' => $user->getName(),
            'email' => $user->getUserIdentifier(),
            'role' => $user->getRole(),
        ];
    }

    #[OA\Get(
        path: '/api/users',
        summary: 'Lister tous les utilisateurs',
        tags: ['Users'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Liste des utilisateurs',
                content: new OA\JsonContent(type: 'array', items: new OA\Items(
                    properties: [
                        new OA\Property(property: 'ref', type: 'string'),
                        new OA\Property(property: 'name', type: 'string'),
                        new OA\Property(property: 'email', type: 'string'),
                        new OA\Property(property: 'role', type: 'string'),
                    ]
                ))
            ),
            new OA\Response(response: 403, description: 'Admin requis'),
        ]
    )]
    #[Route('', name: 'users_list', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $users = $em->getRepository(User::class)->findAll();
        return $this->json(array_map([$this, 'formatUser'], $users), 200);
    }

    #[OA\Get(
        path: '/api/users/{ref}',
        summary: 'Détail d\'un utilisateur',
        tags: ['Users'],
        parameters: [
            new OA\Parameter(name: 'ref', in: 'path', required: true, schema: new OA\Schema(type: 'string')),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Détail utilisateur'),
            new OA\Response(response: 403, description: 'Accès interdit'),
            new OA\Response(response: 404, description: 'Utilisateur introuvable'),
        ]
    )]
    #[Route('/{ref}', name: 'users_show', methods: ['GET'])]
    public function show(string $ref, EntityManagerInterface $em): JsonResponse
    {
        $user = $em->getRepository(User::class)->findOneBy(['ref' => "usr_$ref"]);
        $currentUser = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Utilisateur introuvable'], 404);
        }

        if (!$this->isGranted('ROLE_ADMIN') && $currentUser->getUserIdentifier() !== $user->getUserIdentifier()) {
            return $this->json(['error' => 'Accès interdit'], 403);
        }

        return $this->json($this->formatUser($user), 200);
    }
}
