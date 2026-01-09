"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Form, Input, Button, Typography, Alert } from "antd";

const { Title } = Typography;

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      setError("Error al crear el usuario");
      return;
    }

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-4">
        <Card className="shadow-lg">
          <Title level={3} className="text-center mb-6">
            Registro
          </Title>

          {error && (
            <Alert type="error" message={error} showIcon className="mb-4" />
          )}

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: "Nombre requerido" }]}
            >
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email requerido" },
                { type: "email", message: "Email inválido" },
              ]}
            >
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                { required: true, message: "Contraseña requerida" },
                { min: 5, message: "Mínimo 5 caracteres" },
              ]}
            >
              <Input
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Registrar
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}
