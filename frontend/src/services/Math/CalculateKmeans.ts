import { kmeans } from 'ml-kmeans'
import { KMeansResult } from 'ml-kmeans/lib/KMeansResult';

export default function calculateKmeans(arr: Array<Array<number>>): (
  arr: Array<Array<number>>,
) => KMeansResult{
  const ans = kmeans(arr, 5, { initialization: 'kmeans++' })

  return ans
}