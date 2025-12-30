import img from '@/static/img/gallery/梵高-星夜-1889.jpg'
const Gallery = ()=>{
    return <div className='h-full'>
        <img src={img} alt="Starry Night by Van Gogh" className='max-h-full max-w-full' />
    </div>
}

export default Gallery