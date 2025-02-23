import prisma from '@config/database'

export async function activateCard(cardId: string, amount: number, giverId: string) {
    const card = await prisma.card.update({
        where: {id: cardId},
        data: {
            balance: 0,
            giverId: giverId,
            isActive: true
        }
    });
}

export async function deposit