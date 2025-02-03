import { createClient } from '@supabase/supabase-js';

// Sustituye con los valores que me diste
const supabaseUrl = 'https://hibmlrwshxxzbnwthzgu.supabase.co';  // URL de tu proyecto
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpYm1scndzaHh4emJud3Roemd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NTQ1ODcsImV4cCI6MjA1NDEzMDU4N30.IZ9Vz1GzhAhTRpAl3_T4JVPzuesMdXZnSPffvCSQNJk';  // API Key

// Crear cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
