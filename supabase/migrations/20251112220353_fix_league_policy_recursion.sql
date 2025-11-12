-- Fix infinite recursion in league policies
-- Allow league owners to view their own leagues
CREATE POLICY "League owners can view their own leagues"
  ON public.leagues FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

