const api = "https://api.foursquare.com/v2"
const client_id = "GD1U0GHJVRDG1HNUQMPZVIA0GFPV2TSATLU5BEXQDBT4T2LM"
const client_secret = "PZXI0GPI45F00XFPDLHHSUN0EMFYZF4OWLW2FZA53IL2OWKR"
const version = "20180503"

export const search = (lat, lng, query) =>
  fetch(`${api}/venues/search?ll=${lat},${lng}&limit=10&query=${query}&client_id=${client_id}&client_secret=${client_secret}&v=${version}`)
  .then(res => res.json())

export const getDetail = (venueId) =>
  fetch(`${api}/venues/${venueId}?&client_id=${client_id}&client_secret=${client_secret}&v=${version}`)
  .then(res => res.json())
