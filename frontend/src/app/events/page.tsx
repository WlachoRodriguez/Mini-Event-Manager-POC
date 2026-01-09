"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Event {
  id: number;
  name: string;
  date: string;
  description?: string;
  place?: string;
}

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Error cargar los eventos");
        }

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError("No se pudieron cargar los eventos");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [API_URL]);

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Eventos</h1>

        <button
          onClick={() => router.push("/events/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nuevo Evento
        </button>
      </div>

      {events.length === 0 ? (
        <p>No hay eventos registrados</p>
      ) : (
        <ul className="space-y-3">
          {events.map((event) => (
            <li
              key={event.id}
              className="border p-4 rounded cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/events/${event.id}`)}
            >
              <h2 className="font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-600">
                {new Date(event.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
