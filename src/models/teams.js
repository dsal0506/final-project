import db from '../utils/db'

export const getTeams = async (skip, take) => {
  const count = await db.team.count()
  const teams = await db.team.findMany({
    skip,
    take,
  })
  return { count, teams }
}

export const getTeam = async (id) =>
  db.team.findUnique({ where: { teamId: id } })

export const addTeam = async (teamData) =>
  db.team.create({ data: { ...teamData } })

export const updateTeam = async (id, teamData) => {
  const team = await getTeam(id)
  if (team) {
    return db.team.update({
      where: { teamId: id },
      data: { ...teamData },
    })
  }
  return null
}

export const deleteTeam = async (id) =>
  db.team.delete({ where: { teamId: id } })
