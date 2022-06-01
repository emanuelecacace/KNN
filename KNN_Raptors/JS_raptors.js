var ds_length = 420; /*lunghezza del dataset che usiamo per i for*/

function distanza(r1, r2){                                  /*funzione che calcola e retituisce la distanza delle misure con la formula KNN tra 2 esemplari passati in input*/
 var dist = Math.sqrt(
    Math.pow((r1.huml - r2.huml),2) + Math.pow((r1.humw - r2.humw),2) +             
    Math.pow((r1.ulnal - r2.ulnal),2) + Math.pow((r1.ulnaw - r2.ulnaw),2) +
    Math.pow((r1.feml - r2.feml),2) + Math.pow((r1.femw - r2.femw),2) +
    Math.pow((r1.tibl - r2.tibl),2) + Math.pow((r1.tibw - r2.tibw),2) +
    Math.pow((r1.tarl - r2.tarl),2) + Math.pow((r1.tarw - r2.tarw),2) 
    )
  return dist
}

function sort(a, b){                                        /*funzione che da il criterio per la funzione sort che useremo dopo*/
  return a.distanza - b.distanza
}

function knn(rapace, dataset){    /*Funzione con cui calcoliamo le distanze da 1 esemplare dato in input*/

    let distanze = []              /*Vettore in cui salviamo tutte le distanze da un eseplare*/
    
    for(var i = 0; i < ds_length ; i++){
    let dist = distanza(rapace, dataset[i])   /* for che calcola tutte le distanze dall'esemplare dato in input rispetto a tutti gli altri esemplari del dataset*/ 
    
      distanze.push({                        /* inseriamo la distanza e l'esemplare da cui l'abbiamo calcolate nel vettore "distanze" */
      distanza: dist,
      esemplare: dataset[i]
    })
  }
  
  

  distanze.sort(sort)     /*metodo che ordina le distanze secondo il criterio indicato sopra*/

 
  var classi = []         /*vettore su cui andranno memorizzate le classi dei vicini*/
  var K = 3;              /*numero degli esemplari vicini su cui controlliamo*/

  for(var i = 0; i < K; i++){
    classi.push(distanze[i].esemplare.type)    /*for che inserisce nel vettore "classi" le classi dei vicini*/
  }
  
  var predicted = "";
  
  var countsw = 0
  var countw = 0
  var countt = 0
  var countr = 0
  var countso = 0
  
      for(var i = 0; i < K; i++){
      
      if(classi[i]=="SW")
        countsw ++
      else if(classi[i]=="W")
        countw ++
      else if(classi[i]=="T")
        countt ++
      else if(classi[i]=="R")
        countr ++
      else if(classi[i]=="SO")
        countso ++
        
  }
  
  if(countsw>countw && countsw>countt && countsw>countr && countsw>countso)
   predicted = "SW";
  else if(countw>countsw && countw>countt && countw>countr && countw>countso)
   predicted = "W";
  else if (countt>countw && countt>countsw && countt>countr && countt>countso)
   predicted = "T";
  else if (countr>countw && countr>countt && countr>countsw && countr>countso)
   predicted = "R";
  else if (countso>countw && countso>countt && countso>countr && countso>countsw)
   predicted = "SO";

  return predicted;
}

var d = dataset[10]    /*righe per far partire il programma*/
knn(d, dataset) 

   var corretti=0;
   var sbagliati=0;


  for(var i=0; i < ds_length; i++){                      /*for che calcola l'accuracy e l'error rate. Invoca il metodo knn su tutti gli esemplari del dataset*/
      var thruth = dataset[i].type                        /*nella var "thruth" viene memorizzata la classe dell'esemplare inserito*/
      var predict = knn(dataset[i],dataset)               /*nella var "predict" viene memorizzata la classe che il metodo knn ha assegnato*/
      if(thruth == predict)
          corretti ++
      else
          sbagliati ++
  }                                                       /*poi si calcola l'accuracy e l'error rate vedendo quante classi corrette ha assegnato ad ogni esemplare del dataset*/
   console.log("Accuracy: " +
   corretti/(corretti+sbagliati))
   
   console.log("Error rate: " +
   sbagliati/(corretti+sbagliati))
