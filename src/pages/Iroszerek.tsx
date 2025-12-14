import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function List({ data }: { data: JSON }) {
    const ids = Array.isArray(data)
        ? data.map((item: any) => item.id ?? item)
        : Object.keys(data || {});

    if (ids.length === 0) return <div>Nincs elem</div>;

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
    const [data, setData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                const response: Response = await fetch('https://iroszer.sulla.hu/items');
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const json: JSON | any = await response.json();
                const dataPart = json?.data ?? json ?? {};
                if (!cancelled) setData(dataPart);
            } catch (err: any) {
                console.error('Hiba a lekérés során:', err);
                if (!cancelled) setError(err?.message || String(err));
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
    if (error) return <div className="container py-4">Error: {error}</div>;

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="m-0">Iroszer</h1>
                <NavLink to="/iroszerpost" className="btn btn-primary">Új írószer létrehozása</NavLink>
            </div>
            <List data={data as JSON} />
        </div>
    );
}

export default Iroszer;
