type TParams = {
  paramKeys: string[],    // クエリパラメータのキーワード
  values: string[],       // クエリパラメータの値をsplitContextまたはカンマで区切り、paramKeysの値を生成する
  splitContext?: string,  // valuesの各区切り文字を指定できる
  endPoint?: string       // APIエンドポイント（?より前まで）
}[]

const makeQueryParams = (datas: TParams) => {
  for(const data of datas){
    console.log(`[クエリパラメータ作成開始] ${data.paramKeys.join(',')} エンドポイント：${data.endPoint ?? 'なし'}`)
    for(const value of data.values){
      const params = value.split(data.splitContext ?? ',')
      console.log(
        params.map((param, i) => 
          data.endPoint
          ? `${data.endPoint}?${data.paramKeys[i]}=${param}`
          : `${data.paramKeys[i]}=${param}`
        ).join('&')
      )
    }
    console.log(`\n`) 
  }
}

// 以下テストデータ例
const params: TParams = [
  {
    paramKeys: ['test1','test2','minor'],
    values: [
      'aaaaaaaaaaaa,bbbbbbbbbbbbb,ccccccccc',
      'dddddddddddd,eeeeeeeeeee,fffffffff' 
    ],
    endPoint: 'http://localhost:8081/api/v1.0/example/endpoint'
  },
  {
    paramKeys: ['test1','test2','test3'],
    values: [
      'aaaaaaaaaaaa*bbbbbbbbbbbbb*ccccccccc',
      'aaaaaaaaaaaa*bbbbbbbbbbbbb*ccccccccc',
      'aaaaaaaaaaaa*bbbbbbbbbbbbb*ccccccccc',
      'aaaaaaaaaaaa*bbbbbbbbbbbbb*ccccccccc',
      'aaaaaaaaaaaa*bbbbbbbbbbbbb*ccccccccc',
      'aaaaaaaaaaaa*bbbbbbbbbbbbb*ccccccccc', 
    ],
    splitContext: '*'
  }
]
makeQueryParams(params)
