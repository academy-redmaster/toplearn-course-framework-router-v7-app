import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
} from "@heroui/react";
import moment from "moment";
import React from "react";
import { Form, Link, useAsyncValue } from "react-router";

const statusColorMap = {
  pending: "secondary",
  in_progress: "warning",
  completed: "success",
  archived: "primary",
};

export default function TableTodo({ columns, todos }) {
  // const todos = useAsyncValue()
  // const error = useAsyncError()
  const renderCell = React.useCallback((todo, columnKey) => {
    const cellValue = todo[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <User
            avatarProps={{
              radius: "full",
              src: todo?.owner?.profilePhoto,
              isBordered: true,
              color: "default",
              variant: "bordered",
            }}
            description={
              <Chip
                variant="light"
                size="md"
                color="primary"
              >{`${todo?.owner?.email}`}</Chip>
            }
            name={cellValue}
            wrapper="ali"
          ></User>
        );
      case "dueDate":
        return (
          <div className="flex flex-col gap-2">
            <p className="text-bold text-sm capitalize">
              due:{moment(todo.dueDate).format("MMM Do YYYY")}
            </p>
            <p className="text-bold text-sm capitalize text-default-400 ">
              <span className="text-[11px]">daysLeft</span>
              <Chip
                size="sm"
                variant="dot"
                color="primary"
                className="border-0"
              >
                {todo.daysLeft}
              </Chip>
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[todo.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <Link
                to={todo.id}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <i className="ri-eye-line"></i>
              </Link>
            </Tooltip>
            <Tooltip content="Edit todo">
              <Link
                to={`${todo.id}/edit`}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <i className="ri-edit-line"></i>
              </Link>
            </Tooltip>
            <Tooltip color="success" content="completed todo">
              <Form method="PATCH" action="/todo?index">
                <input type="hidden" name="todoId" value={todo.id} />
                <Button
                  color="success"
                  variant="light"
                  isIconOnly
                  type="submit"
                  name="_action"
                  value="complete"
                  className={
                    todo.isCompleted
                      ? "ri-check-double-line text-lg"
                      : "ri-check-line text-lg"
                  }
                ></Button>
              </Form>
            </Tooltip>
            <Tooltip
              color="secondary"
              content={todo.isArchived ? "UnArchived" : "Archived"}
            >
              <Form method="PATCH" action="/todo?index">
                <input type="hidden" name="todoId" value={todo.id} />
                <Button
                  color="secondary"
                  variant="light"
                  isIconOnly
                  type="submit"
                  name="_action"
                  value="archive"
                  className={
                    todo.isArchived
                      ? "ri-bookmark-fill text-lg"
                      : "ri-bookmark-line text-lg"
                  }
                ></Button>
              </Form>
            </Tooltip>
            <Tooltip color="danger" content="Delete todo">
              <Form method="DELETE" action="/todo?index">
                <input type="hidden" name="todoId" value={todo.id} />
                <Button
                  color="danger"
                  variant="light"
                  isIconOnly
                  type="submit"
                  name="_action"
                  value="delete"
                  className="ri-delete-bin-5-line"
                ></Button>
              </Form>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={todos}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
