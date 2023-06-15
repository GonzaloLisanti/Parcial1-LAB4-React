import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Articulo } from "../types/Articulo";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const DetalleArticulo = () => {
    const { id } = useParams<{ id: string }>();
    const [articulo, setArticulo] = useState<Articulo | undefined>();

    useEffect(() => {
        fetchArticulo();
    }, [id]); // Agrega 'id' como dependencia aquí

    const fetchArticulo = async () => {
        try {
            const response = await axios.get(`http://168.194.207.98:8081/api_articulo/get_articulo.php?id=${id}`);
            setArticulo(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!articulo) {
        return <div>Cargando...</div>;
    }

    return (
        <Container fluid className="mt-3">
            <Row>
                <Col>
                    <h3>Código:</h3>
                    <h3>Denominación: </h3>
                    <h3>Precio: </h3>
                    <h3>idrubro: </h3>
                </Col>
                <Col>
                    <h4>{articulo.codigo}</h4>
                    <h4>{articulo.denominacion}</h4>
                    <h4>{articulo.precio}</h4>
                    <h4>{articulo.idrubro}</h4>
                </Col>
            </Row>
            <Link to="/articulos" className="btn btn-primary mt-3">Volver</Link>
        </Container>
    );
}

export default DetalleArticulo;
