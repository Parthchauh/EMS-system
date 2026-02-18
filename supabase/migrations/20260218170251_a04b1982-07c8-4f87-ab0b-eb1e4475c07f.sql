
-- Create departments table
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  head TEXT,
  employee_count INTEGER NOT NULL DEFAULT 0,
  budget TEXT,
  color_variant INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

-- Users can view their own departments
CREATE POLICY "Users can view own departments"
  ON public.departments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own departments
CREATE POLICY "Users can create own departments"
  ON public.departments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own departments
CREATE POLICY "Users can update own departments"
  ON public.departments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own departments
CREATE POLICY "Users can delete own departments"
  ON public.departments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
