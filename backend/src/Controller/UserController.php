<?php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/users')]
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

    #[Route('', name: 'users_list', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $users = $em->getRepository(User::class)->findAll();
        return $this->json(array_map([$this, 'formatUser'], $users), 200);
    }

    #[Route('/{ref}', name: 'users_show', methods: ['GET'])]
    public function show(string $ref, EntityManagerInterface $em): JsonResponse
    {
        $user = $em->getRepository(User::class)->findOneBy(['ref' => "usr_$ref"]);
        $currentUser = $this->getUser();
        if (!$this->isGranted('ROLE_ADMIN') && $currentUser->getUserIdentifier() !== $user->getUserIdentifier()) {
            return $this->json(['error' => 'Accès interdit'], 403);
        }

        if (!$user) {
            return $this->json(['error' => 'Utilisateur introuvable'], 404);
        }

        return $this->json($this->formatUser($user), 200);
    }
}