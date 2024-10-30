'use client';

import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';


async function sendEmail() {
    const res = await fetch(`/api/send-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ao enviar o email: ${errorText}`);
    }

    const data = await res.json();
    return data.message;
}


export default function Order() {

    const router = useRouter();

    const handleYesClick = async () => {
        try {
            const message = await sendEmail();
            alert(message);
            setTimeout(() => {
                window.location.href = 'https://www.youtube.com/watch?v=NEkxSAbcw0M';
            }, 1000);
        } catch (error) {
            const errorMessage = (error as Error).message;
            alert(errorMessage || "Erro desconhecido ao enviar o e-mail");
        }
    };

    const handleNoClick = async () => {
        alert("Você é um homem morto 😡")
    }

    return (
        <div className={styles.container}>
            <h1>Quer namorar comigo?</h1>
            <div className={styles.buttons}>
                <button className={styles.yes} onClick={handleYesClick}>Sim</button>
                <button className={styles.no} onClick={handleNoClick}>Não</button>
            </div>
        </div>
    );
}
