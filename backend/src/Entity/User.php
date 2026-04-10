<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: 'users')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 36, unique: true)]
    private string $ref;

    #[ORM\Column(length: 128)]
    private string $name;

    #[ORM\Column(length: 254, unique: true)]
    private string $email;

    #[ORM\Column(length: 255)]
    private string $password;

    #[ORM\Column(length: 20)]
    private string $role = 'client';

    #[ORM\Column(type: 'datetime')]
    private \DateTimeInterface $creationDate;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Order::class)]
    private Collection $orders;

    #[ORM\OneToMany(mappedBy: 'producer', targetEntity: Product::class)]
    private Collection $products;

    // Interface UserInterface
    public function getRoles(): array { return ['ROLE_'.strtoupper($this->role)]; }
    public function getUserIdentifier(): string { return $this->email; }
    public function eraseCredentials(): void {}

    // Interface PasswordAuthenticatedUserInterface
    public function getPassword(): ?string { return $this->password; }
}
