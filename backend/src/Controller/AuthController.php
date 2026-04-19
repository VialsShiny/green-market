<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/auth')]
final class AuthController extends AbstractController
{
    #[Route('/register', name: 'auth_register', methods: ['POST'])]
    public function register(EntityManagerInterface $em, UserPasswordHasherInterface $hasher, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $required = ['name', 'email', 'password'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                return $this->json(['error' => "Le champ $field est requis"], 400);
            }
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->json(['error' => 'Format email invalide'], 400);
        }

        $existingUser = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return $this->json(['error' => 'Email déjà utilisé'], 400);
        }

        $user = new User();
        $user->setName($data['name'])
            ->setEmail($data['email'])
            ->setRole($data['role'] ?? 'client')
            ->setPassword($hasher->hashPassword($user, $data['password']));

        $em->persist($user);
        $em->flush();

        return $this->json([
            'ref' => $user->getRef(),
            'name' => $user->getName(),
            'email' => $user->getUserIdentifier(),
            'role' => $user->getRole(),
        ], 201);
    }
}
