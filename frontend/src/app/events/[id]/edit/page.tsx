"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Event {
  id: number;
  name: string;
  date: string;
  description?: string;
  place?: string;
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Error cargando evento");
        }

        const data: Event = await res.json();
        setEvent(data);

        setName(data.name);
        setDate(
          new Date(
            new Date(data.date).setHours(new Date(data.date).getHours() - 5)
          )
            .toISOString()
            .slice(0, 16)
        );
        setDescription(data.description || "");
        setPlace(data.place || "");
      } catch (err) {
        setError("No se pudo guardar el evento");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [API_URL, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !date) {
      setError("Nombre y fecha son obligatorios");
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          date: new Date(date),
          description,
          place,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar el evento");
      }

      router.push(`/events/${id}`);
    } catch (err) {
      setError("No se pudo actualizar el evento");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!event) return null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Evento</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre *</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Fecha y hora *</label>
          <input
            type="datetime-local"
            className="w-full border px-3 py-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Descripción</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Lugar</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
