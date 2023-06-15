import React, { useEffect, useState } from "react";
import { Articulo } from "../types/Articulo";
import axios from "axios";
import GenericTable from "./GenericTable";
import { Modal } from "react-bootstrap";
import ArticuloForm from "./ArticuloForm";
import { Link } from "react-router-dom";

const Articulos: React.FC = () => {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [selectedArticulo, setSelectedArticulo] = useState<Articulo | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRubro, setSelectedRubro] = useState("");

    const columns = [
        { title: 'Id', field: 'id' },
        { title: 'Codigo', field: 'codigo' },
        { title: 'Denominación', field: 'denominacion' },
        { title: 'Precio', field: 'precio' },
    ];

    const actions = {
        create: true,
        update: true,
        delete: true,
        verDetalles: true,
    };

    useEffect(() => {
        if (selectedRubro !== "") {
            fetchArticulos(selectedRubro);
        }
    }, [selectedRubro]);

    const fetchArticulos = async (idRubro: string) => {
        try {
            const response = await axios.get(`http://168.194.207.98:8081/api_articulo/get_articulos_por_rubro.php?idrubro=${idRubro}`);
            const articulosData = response.data.map((articulo: Articulo) => {
                return {
                    ...articulo
                };
            });
            setArticulos(articulosData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdd = () => {
        setSelectedArticulo(null);
        setIsFormOpen(true);
    };

    const handleUpdate = (articulo: Articulo) => {
        setSelectedArticulo(articulo);
        setIsFormOpen(true);
    };

    const handleDelete = async (articulo: Articulo) => {
        await axios.delete(`http://168.194.207.98:8081/api_articulo/delete_articulo.php?id=${articulo.id}`);
        fetchArticulos(selectedRubro);
    };

    const handleSubmit = async (articulo: Articulo) => {
        if (articulo.id === 0) {
            await axios.post('http://168.194.207.98:8081/api_articulo/post_articulo.php', articulo);
        } else {
            articulo.id = selectedArticulo!.id;
            await axios.put(`http://168.194.207.98:8081/api_articulo/put_articulo.php`, articulo);
        }
        setIsFormOpen(false);
        fetchArticulos(selectedRubro);
    };

    const handleCancel = () => {
        setIsFormOpen(false);
    };

    const handleRubroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRubro(e.target.value);
    };

    const [rubros, setRubros] = useState<Articulo[]>([]);

    useEffect(() => {
        fetchRubros();
    }, []);

    const fetchRubros = async () => {
        try {
            const response = await fetch('http://168.194.207.98:8081/api_articulo/get_rubros.php');
            const data = await response.json();
            setRubros(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>LISTA DE ARTICULOS</h1>
            <select value={selectedRubro} onChange={handleRubroChange}>
                <option value="">Seleccione un rubro</option>
                {rubros.map((rubro) => (
                    <option key={rubro.id} value={rubro.id}>{rubro.denominacion}</option>
                ))}
            </select>
            <GenericTable data={articulos}
                columns={columns}
                actions={actions}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />

            <Modal show={isFormOpen} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedArticulo ? "Editar Articulo" : "Agregar Articulo"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ArticuloForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        selectedArticulo={selectedArticulo}
                    />
                </Modal.Body>
            </Modal>
            <Link to="/" className="btn btn-primary mt-3">Volver</Link>
        </div>

    )
}
export default Articulos;
