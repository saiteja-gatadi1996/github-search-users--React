import React from 'react'
import styled from 'styled-components'
import { useGithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = useGithubContext()
  const languages = repos.reduce((total, item) => {
    // console.log(`item is ${item}`) //will print each and every repo
    const { language, stargazers_count } = item
    // console.log(language) //will show the language from each repo

    //if language is null, return nothing
    if (!language) return total

    //if not on the object
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      //else if it is already in the object
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    }
    return total
  }, {})

  //language with more no. of repos will be sorted first (Desc)
  const mostUsed = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
  // console.log(mostUsed) //0: {label: "JavaScript", value: 45, stars: 412}

  const mostPopularLanguages = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map((item) => {
      return { ...item, value: item.stars }
    })
    .slice(0, 5)

  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item
      total.stars[stargazers_count] = { label: name, value: stargazers_count }
       total.forks[forks] = { label: name, value: forks }
      return total
    },
    { stars: {}, forks: {} }
  )
  //last 5 in reverse
  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()

  // DUMMY DATA from website provided
  // const chartData = [
  //   {
  //     label: 'HTML',
  //     value: '29',
  //   },
  //   {
  //     label: 'CSS',
  //     value: '260',
  //   },
  //   {
  //     label: 'Javascript',
  //     value: '80',
  //   },
  // ]

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopularLanguages} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
