import {
  Card,
  Input,
  Spacer,
  Textarea,
  Select,
  SelectSection,
  SelectItem,
  DatePicker,
  Button,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import imageUrl from "../assets/image/coffee.png";
import {
  redirect,
  useFetcher,
  useLocation,
  useParams,
  useRouteLoaderData,
} from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import { checkAuth } from "../utils/auth";
import { useMatches } from "react-router";


export default function TodoCreatePage() {
  const fetcher = useFetcher();
  const token = useRouteLoaderData("root");
  const { userId, isTokenExpired } = checkAuth(token);
  const { id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
    priority: "low",
    owner: "",
  });
  // ===========================
  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({
        ...prev,
        owner: userId,
      }));
    }
    if (id) {
      fetcher.load(`/todo/${id}`);
    }
  }, [location.pathname, userId, id]);
  // =======================================
  useEffect(() => {
    if (fetcher.data && id) {
      if (fetcher.data.isCompleted) {
        setFormData({
          ...fetcher.data,
          owner: fetcher.data?.owner?.id,
          completedAt: fetcher.data?.completedAt,
        });
      } else {
        setFormData({
          ...fetcher.data,
          owner: fetcher.data?.owner?.id,
          completedAt: "",
        });
      }
    }
  }, [fetcher.data?.id, id]);
  // =======================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      fetcher.submit(formData, { method: "PUT" });
    } else {
      fetcher.submit(formData, { method: "POST" });
    }
  };
  // ====================================
  if (isTokenExpired) {
    toast.error("token expired ...");
    return redirect("/login");
  }
  return (
    <div className="w-full min-h-[70vh] grid grid-cols-1 lg:grid-cols-2 p-10 lg:px-0">
      <div className="w-full h-full flex flex-col items-center justify-center gap-10">
        <h1 className="text-2xl">{id ? "Edit page" : "Create New Todo"}</h1>
        <img src={imageUrl} className="w-1/2 object-contain" alt="" />
      </div>
      <div className="w-full h-full">
        <Card className="w-full h-full p-4">
          <fetcher.Form
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              isClearable
              fullWidth
              label="Title"
              placeholder="Enter title..."
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Textarea
              fullWidth
              label="Description"
              placeholder="Enter description..."
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Select
              label="Status"
              placeholder="Select Status"
              fullWidth
              selectedKeys={[formData.status]}
              onSelectionChange={(value) => {
                setFormData({ ...formData, status: value.currentKey });
              }}
            >
              <SelectSection>
                {["pending", "in_progress", "completed", "archived"].map(
                  (state) => (
                    <SelectItem key={state}>{state}</SelectItem>
                  )
                )}
              </SelectSection>
            </Select>
            <Spacer y={1} />
            <DatePicker
              label="Due Date"
              variant="bordered"
              name="dueDate"
              fullWidth
              minValue={today(getLocalTimeZone())}
              defaultValue={today(getLocalTimeZone())}
              onChange={(value) => {
                const isoDate = moment(value, "YYYYMMDD").toISOString();
                setFormData({ ...formData, dueDate: isoDate });
              }}
            />
            <Spacer y={1} />
            <Select
              label="Prority"
              placeholder="Select prority"
              fullWidth
              selectedKeys={[formData.priority]}
              onSelectionChange={(value) => {
                setFormData({ ...formData, priority: value.currentKey });
              }}
            >
              <SelectSection>
                {["low", "medium", "high"].map((state) => (
                  <SelectItem key={state}>{state}</SelectItem>
                ))}
              </SelectSection>
            </Select>
            <Spacer y={1} />
            <Button
              fullWidth
              color="primary"
              variant="solid"
              className="uppercase"
              size="lg"
              type="submit"
              disabled={fetcher.state !== "idle"}
            >
              {fetcher.state !== "idle"
                ? "submitting ..."
                : id
                ? "Update todo"
                : "create todo"}
            </Button>
          </fetcher.Form>
        </Card>
      </div>
    </div>
  );
}

export async function clientAction({ request, params }) {
  const result = await request.formData();
  const data = Object.fromEntries(result);
  try {
    if (request.method === "POST") {
      const response = await axios.post(
        "http://localhost:8008/api/todos",
        data
      );
      if (response.status === 200 || response.status === 201) {
        toast.success(" todo added successfully");
        return redirect("/todo");
      }
    } else {
      const response = await axios.put(
        `http://localhost:8008/api/todos/${params.id}`,
        data
      );
      if (response.status === 200 || response.status === 204) {
        toast.info(" todo update successfully");
        return redirect("/todo");
      }
    }
  } catch (error) {
    console.log("🚀 ~ action ~ error:", error);
  }
}


export const handle = {
  crumb: () => {
    const location = useLocation()
    if (location.pathname === "/todo/create") {
      return "Todo Create Page"
    } else {
      return "Todo Edit Page"
    }
  }
}