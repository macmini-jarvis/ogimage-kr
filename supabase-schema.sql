-- OGMaker 구독 테이블
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  paddle_subscription_id text unique,
  paddle_customer_id text,
  status text not null default 'active',
  price_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 인덱스
create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_subscriptions_paddle_sub_id on public.subscriptions(paddle_subscription_id);

-- RLS 활성화
alter table public.subscriptions enable row level security;

-- 유저 본인의 구독만 조회 가능
create policy "Users can view own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);
