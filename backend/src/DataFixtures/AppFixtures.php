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
    ) {}

    public function load(ObjectManager $manager): void
    {
        // Users
        $admin = new User();
        $admin->setRef('USR-001')
            ->setName('Admin Principal')
            ->setEmail('admin@shop.com')
            ->setRole('admin')
            ->setCreationDate(new \DateTime())
            ->setPassword($this->hasher->hashPassword($admin, 'Admin1234!'));

        $producer = new User();
        $producer->setRef('USR-002')
            ->setName('Jean Producteur')
            ->setEmail('producer@shop.com')
            ->setRole('producer')
            ->setCreationDate(new \DateTime())
            ->setPassword($this->hasher->hashPassword($producer, 'Producer1234!'));

        $alice = new User();
        $alice->setRef('USR-003')
            ->setName('Alice Client')
            ->setEmail('alice@shop.com')
            ->setRole('client')
            ->setCreationDate(new \DateTime())
            ->setPassword($this->hasher->hashPassword($alice, 'Alice1234!'));

        $bob = new User();
        $bob->setRef('USR-004')
            ->setName('Bob Client')
            ->setEmail('bob@shop.com')
            ->setRole('client')
            ->setCreationDate(new \DateTime())
            ->setPassword($this->hasher->hashPassword($bob, 'Bob1234!'));

        foreach ([$admin, $producer, $alice, $bob] as $u) {
            $manager->persist($u);
        }

        // Products
        $p1 = new Product();
        $p1->setRef('PRD-001')
            ->setName('Tomates Bio')
            ->setDescription('Tomates bio du jardin')
            ->setPrice('2.50')
            ->setStock(100)
            ->setProducer($producer)
            ->setCreationDate(new \DateTime());

        $p2 = new Product();
        $p2->setRef('PRD-002')
            ->setName('Miel Artisanal')
            ->setDescription('Miel de fleurs local')
            ->setPrice('12.00')
            ->setStock(50)
            ->setProducer($producer)
            ->setCreationDate(new \DateTime());

        $p3 = new Product();
        $p3->setRef('PRD-003')
            ->setName('Fromage de Chèvre')
            ->setDescription('Fromage fermier affiné')
            ->setPrice('6.90')
            ->setStock(30)
            ->setProducer($producer)
            ->setCreationDate(new \DateTime());

        foreach ([$p1, $p2, $p3] as $p) {
            $manager->persist($p);
        }

        // Order items
        $item1 = new OrderItem();
        $item1->setProduct($p1)
            ->setQuantity(4)
            ->setUnitPrice('2.50');

        $item2 = new OrderItem();
        $item2->setProduct($p3)
            ->setQuantity(1)
            ->setUnitPrice('6.90');

        // Order
        $order = new Order();
        $order->setRef('ORD-001')
            ->setStatus('confirmed')
            ->setTotalPrice('17.00')
            ->setUser($alice)
            ->setCreationDate(new \DateTime())
            ->addItem($item1)
            ->addItem($item2);

        // Persist order and cascade items
        $manager->persist($order);

        $manager->flush();
    }
}
