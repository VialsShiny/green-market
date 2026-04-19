<?php

namespace App\DataFixtures;

use App\Entity\{User, Product, Order, OrderItem};
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(
        private readonly UserPasswordHasherInterface $hasher
    ) {
    }

    private static function ref(string $prefix): string
    {
        return $prefix . '_' . bin2hex(random_bytes(16)); // ex: usr_a3f1...  (36 chars)
    }

    private function makeUser(string $name, string $email, string $role, string $password): User
    {
        $user = (new User())
            ->setRef(self::ref('usr'))
            ->setName($name)
            ->setEmail($email)
            ->setRole($role)
            ->setCreationDate(new \DateTime());

        $user->setPassword($this->hasher->hashPassword($user, $password));

        return $user;
    }

    private function makeProduct(string $name, string $description, string $price, int $stock, User $producer): Product
    {
        return (new Product())
            ->setRef(self::ref('prd'))
            ->setName($name)
            ->setDescription($description)
            ->setPrice($price)
            ->setStock($stock)
            ->setProducer($producer)
            ->setCreationDate(new \DateTime());
    }

    private function makeOrderItem(Product $product, int $quantity, string $unitPrice): OrderItem
    {
        return (new OrderItem())
            ->setProduct($product)
            ->setQuantity($quantity)
            ->setUnitPrice($unitPrice);
    }

    public function load(ObjectManager $manager): void
    {
        $admin = $this->makeUser('Admin Principal', 'admin@shop.com', 'admin', 'Admin1234!');
        $producer = $this->makeUser('Jean Producteur', 'producer@shop.com', 'producer', 'Producer1234!');
        $alice = $this->makeUser('Alice Client', 'alice@shop.com', 'client', 'Alice1234!');
        $bob = $this->makeUser('Bob Client', 'bob@shop.com', 'client', 'Bob1234!');

        foreach ([$admin, $producer, $alice, $bob] as $user) {
            $manager->persist($user);
        }

        $tomates = $this->makeProduct('Tomates Bio', 'Tomates bio du jardin', '2.50', 100, $producer);
        $miel = $this->makeProduct('Miel Artisanal', 'Miel de fleurs local', '12.00', 50, $producer);
        $fromage = $this->makeProduct('Fromage de Chèvre', 'Fromage fermier affiné', '6.90', 30, $producer);

        foreach ([$tomates, $miel, $fromage] as $product) {
            $manager->persist($product);
        }

        $order = (new Order())
            ->setRef(self::ref('ord'))
            ->setStatus('confirmed')
            ->setTotalPrice('17.00')
            ->setUser($alice)
            ->setCreationDate(new \DateTime())
            ->addItem($this->makeOrderItem($tomates, 4, '2.50'))
            ->addItem($this->makeOrderItem($fromage, 1, '6.90'));

        $manager->persist($order);

        $manager->flush();
    }
}