import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const { NEXT_EMAIL_USER, NEXT_EMAIL_PASS, NEXT_EMAIL_RECEIVER, NEXT_EMAIL_RECEIVER_TWO } = process.env;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NEXT_EMAIL_USER,
            pass: NEXT_EMAIL_PASS,
        },
    });

    try {
        await Promise.all([
            transporter.sendMail({
                from: NEXT_EMAIL_USER,
                to: NEXT_EMAIL_RECEIVER,
                subject: 'Pedido de Namoro',
                text: 'Ah, ele clicou em "Sim"! 💗',
            }),

            transporter.sendMail({
                from: NEXT_EMAIL_USER,
                to: NEXT_EMAIL_RECEIVER_TWO,
                subject: 'Pedido de Namoro',
                text: 'Desde o momento em que nossos olhares se cruzaram, soube que você era alguém especial. A forma como você sorri ilumina meu dia e faz meu coração acelerar. Cada momento ao seu lado é como um sonho que se torna realidade, repleto de risos, cumplicidade e carinho. Você traz uma paz inexplicável à minha vida, e cada conversa, cada toque, me faz sentir mais próximo de você. Quero que saiba que você é único para mim e que estou ansiosa para construir memórias lindas juntos. Que nossa jornada seja cheia de amor, descobertas e momentos inesquecíveis. Você é a razão pela qual acredito que o amor verdadeiro realmente existe. 💗',
            })
        ])

        return NextResponse.json({ message: "Verifique sua caixa de entrada por gentileza 🥰..." });
    } catch (err) {
        console.error("Erro ao enviar o email: ", err);
        return NextResponse.json({ message: "Erro ao enviar o email" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    return NextResponse.json({ message: "GET method not supported for this endpoint." }, { status: 405 });
}
