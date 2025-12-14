import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";



function IroszerPost() {
    const navigate = useNavigate();

    const [idName, setIdName] = useState<string>("");
    const [priceStr, setPriceStr] = useState<string>("");

    async function postItem(id: string, price: number): Promise<void> {
        setLoading(true);
        setError(null);
        try {
            const body = { id, name: id, price };
            const response = await fetch('https://iroszer.sulla.hu/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const json = await response.json();
            const created = json?.data ?? json;
            setData(created ?? null);
            navigate('/');
        } catch (err: any) {
            setError(err?.message ?? String(err));
        } finally {
            setLoading(false);
        }
    }


    const [data, setData] = useState<{ id?: string; name?: string; price?: number } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    return (
        <div className="container py-4">
            <div className="card mx-auto" style={{ maxWidth: 720 }}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1 className="h4 m-0">Új írószer létrehozása</h1>
                        <NavLink to="/iroszerek" className="btn btn-link">Vissza</NavLink>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); postItem(idName, Number(priceStr)); }}>
                        <div className="mb-3">
                            <label className="form-label">ID / Név</label>
                            <input
                                className="form-control"
                                type="text"
                                value={idName}
                                onChange={(e) => setIdName(e.target.value)}
                                placeholder="id (megegyezik a név)"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Ár</label>
                            <input
                                className="form-control"
                                type="number"
                                value={priceStr}
                                onChange={(e) => setPriceStr(e.target.value)}
                                placeholder="ár"
                            />
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-success" disabled={loading || !idName || priceStr === ""}>
                                {loading ? 'Feltöltés...' : 'Létrehoz'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/iroszerek')}>Mégse</button>
                        </div>
                    </form>

                    {error && <div className="text-danger mt-3">Hiba: {error}</div>}

                    {data && (
                        <div className="mt-3">
                            <h6>Válasz:</h6>
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default IroszerPost;