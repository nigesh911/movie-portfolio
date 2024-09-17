@echo off

mkdir src\app\api\auth\[...nextauth] src\app\api\movies src\app\api\trending src\app\api\watched src\app\api\share src\app\home src\app\trending src\app\watched src\app\share src\components src\lib src\types public\images

type nul > src\app\layout.tsx
type nul > src\app\page.tsx
type nul > src\app\globals.css
type nul > src\app\home\page.tsx
type nul > src\app\trending\page.tsx
type nul > src\app\watched\page.tsx
type nul > src\app\share\page.tsx
type nul > src\app\api\auth\[...nextauth]\route.ts
type nul > src\app\api\movies\route.ts
type nul > src\app\api\trending\route.ts
type nul > src\app\api\watched\route.ts
type nul > src\app\api\share\route.ts
type nul > src\components\Navbar.tsx
type nul > src\components\Footer.tsx
type nul > src\components\MovieCard.tsx
type nul > src\components\MovieGrid.tsx
type nul > src\components\InfiniteScroll.tsx
type nul > src\components\AuthModal.tsx
type nul > src\components\ReviewForm.tsx
type nul > src\lib\tmdb.ts
type nul > src\types\index.ts
type nul > .env.local
type nul > next.config.js
type nul > tailwind.config.js

echo File structure created successfully!