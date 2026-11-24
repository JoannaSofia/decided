import React from 'react'
import Link from 'next/link'

type CategoryCardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  href: string;
}

const cards = [
    {
        title: "wardrobe",
        description: "Plan your clothing for the week",
        imageUrl: "/wardrobe",
        href: "/wardrobe",
    },  
    {
        title: "beauty",
        description: "Coming soon",
        href: "/beauty",
    },
    {
        title: "food",
        description: "Coming soon",
        href: "/food", 
    },
    {
        title: "health",
        description: "Coming soon",
        href: "/health", 
    },
]

export default function PlanningPage({
    title,
    description,
    imageUrl,
    href,
}: CategoryCardProps) {
  return (
    <section className='grid grid-cols-2 gap-4 p-10'> 
        {cards.map((card) => (
            <Link 
            key={card.href}
            href={card.href}
            className="border border-stone-300 p-6 hover:shadow-md transition"
            >
            <img src={imageUrl} alt=""/>
            <h3 className='font-semibold capitalize'>{card.title}</h3>
            <p>{card.description}</p>

            </Link>
        ))}
    </section>
  )
}
