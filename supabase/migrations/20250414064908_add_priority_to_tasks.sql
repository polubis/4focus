DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_priority') THEN
        CREATE TYPE public.task_priority AS ENUM ('1', '2', '3', '4');
        RAISE NOTICE 'Type public.task_priority created.';
    ELSE
        RAISE NOTICE 'Type public.task_priority already exists, skipping creation.';
    END IF;
END;
$$;

ALTER TABLE public.tasks
ADD COLUMN priority public.task_priority NOT NULL;

COMMENT ON COLUMN public.tasks.priority IS 'Task priority (1 - the highest, 4 - the lowest).';
