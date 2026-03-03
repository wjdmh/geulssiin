-- Gallery 테이블에 작품 판매 관련 컬럼 추가
-- Supabase SQL Editor에서 실행하세요.

ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS price text DEFAULT '미정';
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS is_for_sale boolean DEFAULT false;
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS is_sold boolean DEFAULT false;
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS medium text;
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS dimensions text;
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS year text;
