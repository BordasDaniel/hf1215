import { useEffect, useState} from "react";
import { NavLink, useParams } from "react-router-dom";


interface IroszerData {
    id: string;
    name: string;
    price: number;
}

function IroszerAdat(data: IroszerData) 
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

    const [data, setData] = useState<IroszerData>({} as IroszerData);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | Error | null>(null);
    const id:string = useParams().id || "";

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                const response: Response = await fetch(`https://iroszer.sulla.hu/items/${id}`);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const json: IroszerData = await response.json();
                const dataPart: IroszerData = json ?? {} as IroszerData;
                if (!cancelled) setData(dataPart);
            } catch (err: Error | any) {
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
    if (error) return <div>Error: {error instanceof Error ? error.message : String(error)}</div>;

    

    return (
        <>
            <h1>Írószer: {id}</h1>
            <NavLink to="/iroszerek">Vissza az írószerekhez</NavLink>
            <IroszerAdat {...data} />
        </>
    );

}

export default Iroszer;