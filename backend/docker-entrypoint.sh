#!/bin/bash
set -e

# ─────────────────────────────────────────────
#  Couleurs
# ─────────────────────────────────────────────
RESET='\033[0m'
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'

log()     { echo -e "${BOLD}${CYAN}[APP]${RESET} $1"; }
success() { echo -e "${BOLD}${GREEN}[OK]${RESET}  $1"; }
warn()    { echo -e "${BOLD}${YELLOW}[WARN]${RESET} $1"; }
error()   { echo -e "${BOLD}${RED}[ERR]${RESET} $1"; }

echo ""
echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${BOLD}${CYAN}   Démarrage du conteneur PHP/Apache  ${RESET}"
echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

# ─────────────────────────────────────────────
#  1. .htaccess
# ─────────────────────────────────────────────
log "Génération du .htaccess..."
cat > /var/www/html/public/.htaccess << 'EOF'
DirectoryIndex index.php
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [QSA,L]
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
</IfModule>
EOF
success ".htaccess généré"

# ─────────────────────────────────────────────
#  2. Autoloader
#  Régénéré au runtime pour inclure les fichiers
#  montés via le volume Docker
# ─────────────────────────────────────────────
log "Génération de l'autoloader Composer..."
if composer dump-autoload --no-scripts 2>/dev/null; then
    success "Autoloader généré"
else
    warn "Autoloader : échec (non bloquant)"
fi

# ─────────────────────────────────────────────
#  3. Cache Symfony
# ─────────────────────────────────────────────
log "Nettoyage du cache Symfony (env=dev)..."
if php bin/console cache:clear --env=dev 2>/dev/null; then
    success "Cache vidé"
else
    warn "Cache : échec (non bloquant)"
fi

# ─────────────────────────────────────────────
#  4. Migrations Doctrine
# ─────────────────────────────────────────────
log "Exécution des migrations Doctrine..."
if php bin/console doctrine:migrations:migrate --no-interaction 2>/dev/null; then
    success "Migrations appliquées"
else
    warn "Migrations : échec (base peut-être indisponible)"
fi

# ─────────────────────────────────────────────
#  5. Fixtures
# ─────────────────────────────────────────────
log "Chargement des fixtures..."
if php bin/console doctrine:fixtures:load --no-interaction 2>/dev/null; then
    success "Fixtures chargées"
else
    warn "Fixtures : échec (non bloquant)"
fi

# ─────────────────────────────────────────────
#  6. Démarrage Apache
# ─────────────────────────────────────────────
echo ""
echo -e "${BOLD}${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${BOLD}${GREEN}   Apache démarre — bonne chance 🚀   ${RESET}"
echo -e "${BOLD}${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

exec apache2-foreground