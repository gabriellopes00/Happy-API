//imports
    import Orphanages from '../models/orphanages'
    import imagesView from './imagesViews'

export default {// Show Orphanages function
    render(orphanage: Orphanages){
        return{
                id: orphanage.id,
                name: orphanage.name,
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
                about: orphanage.about,
                instructions: orphanage.instructions,
                opening_hours: orphanage.opening_hours,
                open_on_weekends: orphanage.open_on_weekends,
                images: imagesView.renderMany(orphanage.images)
        }
    },

    renderMany(orphanage: Orphanages[]){
        return orphanage.map(orphanage => this.render(orphanage));
    }
}