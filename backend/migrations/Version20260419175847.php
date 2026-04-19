<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260419175847 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE products ADD title VARCHAR(255) DEFAULT NULL, ADD category VARCHAR(100) DEFAULT NULL, ADD image VARCHAR(500) DEFAULT NULL, ADD rating_rate NUMERIC(3, 1) DEFAULT 0 NOT NULL, ADD rating_count INT DEFAULT 0 NOT NULL, CHANGE creation_date created_at DATETIME NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE products DROP title, DROP category, DROP image, DROP rating_rate, DROP rating_count, CHANGE created_at creation_date DATETIME NOT NULL');
    }
}
