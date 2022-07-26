import { StyleSheet, FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Topic from '../../components/Topic'
import TopicsGroupRow from '../../components/TopicsGroupRow'
import { topics } from '../../data/topic'
import { groupByLevel } from '../../util/groupByLevel'
import { getCurrentActiveLevel } from '../../util/getCurrentActiveLevel'
import { TopicT } from '../../types/models.d'

const TopicsScreen = () => {
  const [levels, setLevels] = useState([] as TopicT[][]);

  const [currentLevel, setCurrentLevel] = useState(1);

  useEffect(() => {
    setLevels(groupByLevel(topics))
    setCurrentLevel(getCurrentActiveLevel(levels))
  }, [currentLevel])



  return (

    <View style={styles.container}>
      {/*  <Text>{ currentLevel }</Text> */}
      <FlatList
        data={levels}
        bounces={true}
        showsVerticalScrollIndicator={false}

        renderItem={({ item: level }) =>
          <TopicsGroupRow>

            {
              level && level.map((topic, i) => (
                <Topic key={i} locked={currentLevel < topic.level} currentLevel={currentLevel} {...topic} />
              ))
            }
          </TopicsGroupRow>}
      />


    </View>
  )
}

export default TopicsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",

  }
})