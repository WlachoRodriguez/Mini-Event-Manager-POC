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

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 404) {
          setError("Evento no encontrado");
          return;
        }

        if (!res.ok) {
          throw new Error("Error al cargar el evento");
        }

        const data: Event = await res.json();
        setEvent(data);
      } catch (err) {
        setError("No se pudo cargar el evento");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [API_URL, id]);

  const handleDelete = async () => {
    const confirmDelete = confirm("¿Estás seguro de eliminar este evento?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el evento");
      }

      router.push("/events");
    } catch (err) {
      alert("No se pudo eliminar el evento");
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!event) return null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{event.name}</h1>

      <p className="text-gray-600 mb-2">
        {new Date(event.date).toLocaleString()}
      </p>

      {event.place && (
        <p className="mb-2">
          <strong>Lugar:</strong> {event.place}
        </p>
      )}

      {event.description && (
        <p className="mb-4">
          <strong>Descripción:</strong> {event.description}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => router.push(`/events/${id}/edit`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Editar
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>

        <button
          onClick={() => router.push("/events")}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
