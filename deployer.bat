@echo off
echo ==========================================
echo   DEPLOIEMENT PORTFOLIO - GitHub Pages
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/4] Verification du depot git...
if not exist ".git" (
    echo Depot Git introuvable. Initialisez-le une seule fois avec : git init -b main
    pause
    exit /b 1
)

echo [2/4] Ajout des fichiers...
git add .

echo [3/4] Creation du commit...
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo Aucun changement a publier.
) else (
    git commit -m "Mise a jour du portfolio"
)

echo [4/4] Envoi vers GitHub...
git push -u origin main
if errorlevel 1 (
    echo Echec de la publication.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo   TERMINE ! Visite dans 2 minutes :
echo   https://SidiTall11.github.io
echo ==========================================
pause
