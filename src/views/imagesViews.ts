//imports
    import Images from '../models/images'

export default {// Show images function
    render(images: Images){
        return{
            id: images.id,
            url: `http://localhost:3333/uploads/${images.path}`
        }
    },

    renderMany(image: Images[]){
        return image.map(image => this.render(image));
    }
}