const bands = require('./bands.json')

const array = []
const longestSongs = []
const shortestSongs = []
const participantsExceptSoloists = []
let longestName = ''
let longestNameBand = ''
const durationByBand = {}
const tracksNames = []
const participantWithF = []
let totalDuration = 0

bands.forEach(band => {
	// ! 1.1

	const tracks = band.tracks.map(track => track.name).join(', ')
	array.push(`${band.bandName}: ${tracks}`)

	// ! 1.2

	let longestSong = band.tracks[0]
	let shortestSong = band.tracks[0]

	band.tracks.forEach(track => {
		if (track.duration > longestSong.duration) {
			longestSong = track
		}
		if (track.duration < shortestSong.duration) {
			shortestSong = track
		}
	})

	// ! 1.3

	longestSongs.push(
		`${band.bandName}: ${longestSong.name} - ${
			(longestSong.duration - (longestSong.duration % 60)) / 60
		} min ${longestSong.duration % 60} sec`
	)
	shortestSongs.push(
		`${band.bandName}: ${shortestSong.name} - ${
			(shortestSong.duration - (shortestSong.duration % 60)) / 60
		} min ${shortestSong.duration % 60} sec`
	)

	const participantsWithoutSoloist = band.participants.filter(
		participant => participant != band.soloist
	)
	participantsExceptSoloists.push(...participantsWithoutSoloist)

	// ! 1.4

	band.participants.forEach(participant => {
		if (participant.length > longestName.length) {
			longestName = participant
			longestNameBand = band.bandName
		}
	})

	// ! 1.5

	durationByBand[band.bandName] = 0

	band.tracks.forEach(track => {
		durationByBand[band.bandName] += track.duration
	})

	// ! 1.6

	band.tracks.forEach(track => {
		tracksNames.push(track.name)
	})

	// ! 1.7

	band.participants.forEach(participant => {
		if (participant.toLocaleLowerCase().includes('f')) {
			participantWithF.push(participant)
		}
	})

	// ! 1.8

	band.tracks.forEach(track => {
		totalDuration += track.duration
	})
})

const sortedDurationByBand = Object.entries(durationByBand)
	.map(([band, duration]) => ({ band, duration }))
	.sort((a, b) => b.duration - a.duration)

tracksNames.sort((a, b) => a.localeCompare(b))

console.log(array)
console.log('Найдовші пісні:')
console.log(longestSongs)
console.log('\nНайкоротші пісні:')
console.log(shortestSongs)
console.log('\nУчасники, окрім солістів:')
console.log(participantsExceptSoloists)
console.log(
	`Учасник з найдовшим ім'ям: ${longestName} з гурту ${longestNameBand}`
)
sortedDurationByBand.forEach(item => {
	const minutes = (item.duration - (item.duration % 60)) / 60
	const seconds = item.duration % 60
	console.log(`${item.band} - ${minutes} min ${seconds} sec`)
})
console.log(tracksNames)
console.log("\nУчасники з літерою 'f' у імені:")
console.log(participantWithF)
console.log(
	`\nЗагальна тривалість всіх треків: ${
		(totalDuration - (totalDuration % 60)) / 60
	} min ${totalDuration % 60} sec`
)
