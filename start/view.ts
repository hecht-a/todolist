/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import View from '@ioc:Adonis/Core/View'
import { addCollection, edgeIconify } from 'edge-iconify'
import { icons as tablerIcons } from '@iconify-json/tabler'
import { icons as heroIcons } from '@iconify-json/heroicons-outline'

View.use(edgeIconify)
addCollection(tablerIcons)
addCollection(heroIcons)
