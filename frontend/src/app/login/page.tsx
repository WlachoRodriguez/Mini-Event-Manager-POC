"use client";
import { useState } from "react";
import { Card, Typography, Form, Input, Button } from "antd";
const { Title } = Typography;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    debugger;
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.href = "/events";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="shadow-lg">
        <Title level={3} className="text-center mb-6">
          Login
        </Title>

        <Form layout="vertical" onFinish={submit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email requerido" }]}
          >
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password requerido" }]}
          >
            <Input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
