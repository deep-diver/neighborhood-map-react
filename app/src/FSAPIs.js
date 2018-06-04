const api = "https://api.foursquare.com/v2"
const client_id = "GD1U0GHJVRDG1HNUQMPZVIA0GFPV2TSATLU5BEXQDBT4T2LM"
const client_secret = "PZXI0GPI45F00XFPDLHHSUN0EMFYZF4OWLW2FZA53IL2OWKR"
const version = "20180503"

/*
categories in "search"

Art & Entertainment (4d4b7104d754a06370d81259)
College & University (4d4b7105d754a06372d81259)
Event (4d4b7105d754a06373d81259)
Food (4d4b7105d754a06374d81259)
Nightlife Spot (4d4b7105d754a06376d81259)
Outdoors & Recreation (4d4b7105d754a06377d81259)
Professional & Other places (4d4b7105d754a06375d81259)
Residence (4e67e38e036454776db1fb3a)
Shop & Service (4d4b7105d754a06378d81259)
Travel & Transport (4d4b7105d754a06379d81259)
*/

export const search = (lat, lng, query) =>
  fetch(`${api}/venues/search?ll=${lat},${lng}&limit=10&query=${query}&client_id=${client_id}&client_secret=${client_secret}&v=${version}`)
  .then(res => res.json())

export const search_q = (lat, lng, query, radius, limits, categories) =>
  fetch(`${api}/venues/search?ll=${lat},${lng}&
                              limit=${limits}&
                              radius=${radius}&
                              categoryId=${categories}&
                              client_id=${client_id}&
                              client_secret=${client_secret}&
                              v=${version}`)
  .then(res => res.json())

export const getDetail = (venueId) =>
  fetch(`${api}/venues/${venueId}?&client_id=${client_id}&client_secret=${client_secret}&v=${version}`)
  .then(res => res.json())

export const getPhotos = (venueId) =>
  fetch(`${api}/venues/${venueId}/photos?&limit=1&client_id=${client_id}&client_secret=${client_secret}&v=${version}`)
  .then(res => res.json())
