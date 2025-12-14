import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface IroszerDataFullFetcth {
    status: boolean,
    data: ListaData;
}

interface ListaData {
    [id: string]: IroszerData;
}

interface IroszerData {
    id: string;
    name: string;
    price: number;
}
 

function List({ data }: { data: ListaData}) {
    
    const ids: string[] = Array.isArray(data) ? data.map((item: IroszerData) => item.id) : Object.keys(data);
    if (!data || Object.keys(data).length === 0) return <div>Nincs adat</div>;

    return (
        <div className="items-container">
            {ids.map((id: string) => (
                <div key={id} className="card card-hover" style={{ width: 260 }}>
                    <div className="card-body">
                        <h5 className="card-title mb-2">
                            {id}
                        </h5>
                        <NavLink to={`/iroszer/${id}`} className="card-text text-muted">Részletek megtekintése</NavLink>
                    </div>
                </div>
            ))}
        </div>
    );
}

function Iroszer() {
    const [data, setData] = useState<ListaData>({} as ListaData);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                const response: Response = await fetch('https://iroszer.sulla.hu/items');
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const json: IroszerDataFullFetcth = await response.json();
                const dataPart: ListaData = json?.data ?? json ?? {};
                if (!cancelled) setData(dataPart);
            } catch (err: Error | any) {
                console.error('Hiba a lekérés során:', err);
                if (!cancelled) setError(err instanceof Error ? err.message : String(err));
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();

        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) return <div className="container py-4">Loading...</div>;
    if (error) return <div className="container py-4">Error: {error instanceof Error ? error.message : String(error)}</div>;

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="m-0">Iroszer</h1>
                <NavLink to="/iroszerpost" className="btn btn-primary">Új írószer létrehozása</NavLink>
            </div>
            <List data={data} />
        </div>
    );
}

export default Iroszer;
