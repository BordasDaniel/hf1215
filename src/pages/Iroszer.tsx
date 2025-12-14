import { useEffect, useState} from "react";
import { NavLink, useParams } from "react-router-dom";


function IroszerAdat({ data }: { data: { id: string; name: string; price: number } })
{
    console.log("IroszerAdat data:", data);
    if (!data || Object.keys(data).length === 0) return <div>Nincs adat</div>;
    return (
        <div className="card mx-auto" style={{ maxWidth: 540 }}>
            <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">ID: {data.id}</h6>
                <p className="card-text">Ár: {data.price} Ft</p>
            </div>
        </div>
    );
}

function Iroszer()
{

    const [data, setData] = useState<Object>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const id:string = useParams().id || "";

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                const response: Response = await fetch(`https://iroszer.sulla.hu/items/${id}`);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const json = await response.json();
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
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    

    return (
        <>
            <h1>Írószer: {id}</h1>
            <NavLink to="/iroszerek">Vissza az írószerekhez</NavLink>
            <IroszerAdat data={data as { id: string; name: string; price: number }} />
        </>
    );

}

export default Iroszer;