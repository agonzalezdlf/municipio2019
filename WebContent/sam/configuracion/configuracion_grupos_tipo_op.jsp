<%@ page contentType="text/html;charset=UTF-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<title>Configuración de Firmas</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="../../include/js/bootstrap-3.3.7/css/bootstrap-3.3.7.min.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css">
<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7/js/bootstrap-3.3.7.min.js"></script>	
<script type="text/javascript" src="../../dwr/interface/controladorGruposTipoOpRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"> </script>  
<script type="text/javascript" src="../../dwr/engine.js"> </script>
<script type="text/javascript" src="configuracion_grupos_tipo_op.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/toolsamV20.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>

  

<body >
<form class="form-horizontal" name="forma" method="get" action="" onSubmit=" return false" >
<br />
	<div style="width:1200px; margin-left:auto; margin-right:auto" class="container"> 
	   <div class="row col-md-offset-2">
    	   <h1 class="h1-encabezado"> Configuración - Grupos de tipos de Ordenes de Pago</h1>
       </div>  
       <div class="well">
       <br>
       	<div class="row">
       		<div class="form-group ">
	        	<label for="grupo" class="col-md-2 control-label">Grupo:</label>
    	      	<div class="col-md-5">
   					<select name="grupo" size="1" class="comboBox form-control small" id="grupo" style="width:445px;">
			       		<option value="">[Seleccione]</option>
			          	<c:forEach items="${grupos}" var="item" varStatus="status">
		              	<option value="<c:out value='${item.ID_GRUPO_CONFIG}'/>" >
        		      	<c:out value="${item.GRUPO_CONFIG}"/>
                		</option>
			          </c:forEach>
		      	 	</select>
	          	</div>
    	    </div>
       	</div>
       	<div class="row">
       		<div class="form-group">
	          <div class="col-md-2 col-md-offset-2">
 				 <input type="button"  class="btn btn-success btn-sm" id="btnGrabar" name="btnGrabar" value="Guardar"   style="width:100px"/>
        	  </div>
		    </div> 
       	</div>
      </div>	 
          	 
  	</div>
        <div>
        	
   			<table width="100%"  border="0" align="center"  cellpadding="0" cellspacing="0" class="table table-hover table table-condensed"  id="detallesTabla" >
		        <thead class="thead-inverse">
			        <tr >
                        
           				<th width="20%" style="text-align: center;" height="20"><input type="checkbox" name="todos" id="todos" ></th>
                           <th width="30%"  >Descripción</th>
                           <th width="30%" align="left"></th>
           			</tr>
		        </thead>
		        <tbody>
		        </tbody>
	      </table>
           
		</div>
	</div>
</form>
</body>
</html>
