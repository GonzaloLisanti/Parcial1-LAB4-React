import React from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import { TableProps } from "../types/CamposTablaGenerica";

const GenericTable: React.FC<TableProps> = ({
  data,
  columns,
  actions,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const handleVerDetalles = (id: number) => {
    window.location.href = `/articulos/${id}`;
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col sm={4} className="text-start">
          {actions.create && (
            <Button variant="primary" onClick={onAdd}>
              Agregar
            </Button>
          )}
        </Col>
      </Row>
      <Table responsive>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  width: `${column.width ? (column.width * 100) / 12 : ""}%`,
                }}
              >
                {column.title}
              </th>
            ))}
            {(actions.update || actions.delete) && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, key) => (
                <td key={key}>
                  {column.render ? column.render(item) : item[column.field]}
                </td>
              ))}
              <td>
                {actions.update && (
                  <Button
                    variant="primary"
                    onClick={() => onUpdate!(item)}
                    className="ms-1"
                  >
                    Editar
                  </Button>
                )}
                {actions.delete && (
                  <Button
                    variant="danger"
                    onClick={() => onDelete!(item)}
                    className="ms-1"
                  >
                    Eliminar
                  </Button>
                )}
                {actions.verDetalles && (
                  <Button
                    variant="success"
                    onClick={() => handleVerDetalles(item.id)}
                    className="ms-1"
                  >
                    Ver detalles
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GenericTable;
