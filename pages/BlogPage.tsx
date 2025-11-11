
import React from 'react';

const BlogPage: React.FC = () => {
    const posts = [
        {
            id: 7,
            title: 'From Podcast to Powerhouse: The Story of TSA Records',
            href: '#/about',
            description: 'It started with a mic and a mission: to showcase unseen talent. Learn how the Talent Showcase Africa Podcast grew into a record label dedicated to championing emerging African artists.',
            imageUrl: 'https://picsum.photos/seed/podcast-mic/600/400',
            date: 'Nov 5, 2023',
            datetime: '2023-11-05',
            category: { title: 'Our Story', href: '#' },
            author: {
                name: 'TSA Records',
                imageUrl: 'https://picsum.photos/seed/tsa-logo/32/32',
            },
        },
        {
            id: 1,
            title: 'The Rise of Amapiano: How South African Beats Conquered the World',
            href: '#',
            description: 'From the streets of Pretoria to global dancefloors. We break down the log drum, the dance styles, and how TSA artists are taking the Amapiano sound to new heights.',
            imageUrl: 'https://picsum.photos/seed/amapiano/600/400',
            date: 'Oct 20, 2023',
            datetime: '2023-10-20',
            category: { title: 'Culture', href: '#' },
            author: {
                name: 'DJ Tunde',
                imageUrl: 'https://picsum.photos/seed/tunde/32/32',
            },
        },
        {
            id: 2,
            title: 'Artist Spotlight: Behind the Vibe with Amara',
            href: '#',
            description: 'We sit down with Nigerian alté star Amara to discuss her creative process, her journey with TSA Records, and how she blends traditional sounds with modern flows.',
            imageUrl: 'https://picsum.photos/seed/amara/600/400',
            date: 'Oct 15, 2023',
            datetime: '2023-10-15',
            category: { title: 'Success Story', href: '#' },
            author: {
                name: 'Folake Adebayo',
                imageUrl: 'https://picsum.photos/seed/folake/32/32',
            },
        },
        {
            id: 3,
            title: 'TikTok Dance Challenges: The Secret to Your Next Afrobeats Hit',
            href: '#',
            description: 'It\'s more than just a dance. Learn how to craft a viral moment around your music and partner with the right creators to make your track blow up on TikTok and Reels.',
            imageUrl: 'https://picsum.photos/seed/afro-dance/600/400',
            date: 'Oct 5, 2023',
            datetime: '2023-10-05',
            category: { title: 'Marketing', href: '#' },
            author: {
                name: 'Samuel Chen',
                imageUrl: 'https://picsum.photos/seed/samuel/32/32',
            },
        },
        {
            id: 4,
            title: 'Why Boomplay is a Game-Changer for African Artists',
            href: '#',
            description: 'With millions of users across the continent, Boomplay is essential. We explore how to maximize your presence, get on editorial playlists, and understand its unique user base.',
            imageUrl: 'https://picsum.photos/seed/boomplay/600/400',
            date: 'Sep 25, 2023',
            datetime: '2023-09-25',
            category: { title: 'Industry Tips', href: '#' },
            author: {
                name: 'TSA Insights',
                imageUrl: 'https://picsum.photos/seed/tsa-bot/32/32',
            },
        },
        {
            id: 5,
            title: 'From Accra to the World: The Highlife Renaissance',
            href: '#',
            description: 'Ghana\'s foundational sound is making a huge comeback. Discover how a new generation of artists are re-imagining Highlife for the streaming era.',
            imageUrl: 'https://picsum.photos/seed/ghana-music/600/400',
            date: 'Sep 18, 2023',
            datetime: '2023-09-18',
            category: { title: 'Music', href: '#' },
            author: {
                name: 'Kofi Mensah',
                imageUrl: 'https://picsum.photos/seed/kofi/32/32',
            },
        },
    ]

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">The Gist</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-400">
                        Insights for the African music hustle. Marketing tips, success stories, and industry updates.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className="flex flex-col items-start justify-between bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-neon-purple/50 transition-colors duration-300">
                            <div className="relative w-full">
                                <img
                                    src={post.imageUrl}
                                    alt=""
                                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>
                            <div className="max-w-xl">
                                <div className="mt-8 flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.datetime} className="text-gray-500">
                                        {post.date}
                                    </time>
                                    <a
                                        href={post.category.href}
                                        className="relative z-10 rounded-full bg-electric-blue/10 px-3 py-1.5 font-medium text-electric-blue hover:bg-electric-blue/20"
                                    >
                                        {post.category.title}
                                    </a>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-gray-300">
                                        <a href={post.href}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-400">{post.description}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-white">
                                           {post.author.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BlogPage;