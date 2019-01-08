<%@ page contentType="text/html;charset=UTF-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html>
<head>
<!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Listado de Pedidos</title>

<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="lst_pedidos.js?x=<%=System.currentTimeMillis()%>"> </script>
<script type="text/javascript" src="../../dwr/interface/controladorPedidos.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/boostrap-select/dist/css/bootstrap-select.css" type="text/css">
<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<script type="text/javascript" src="../../include/css/boostrap-select/dist/js/bootstrap-select.js"></script>
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>

<!-- 
<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css">
<link rel="stylesheet" href="../../include/js/componentes_BACK/jalert_2018.css" type="text/css">
<link type="text/css" href="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.css" rel="stylesheet" /> 
<script type="text/javascript" src="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.min.js"></script>

	 <script type="text/javascript" src="../../include/js/jquery-1.7.2.min.js"></script> 
<script type="text/javascript" src="../../include/js/autocomplete/jquery.autocomplete.js"></script>
<link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />	



	 
	 <script type="text/javascript" src="../../include/js/jquery-1.8.3.min.js"></script>
	 <script type="text/javascript" src="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.min.js"></script>


<script type="text/javascript" src="../../include/js/toolSam_olds.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/componentes_BACK/jalert_2018.js"></script>


<script type="text/javascript" src="../../include/js/autocomplete/jquery.autocomplete.js"></script>
<script type="text/javascript" src="../../include/js/autocomplete/autompleteVarios.js"></script>
<script type="text/javascript" src="../../dwr/interface/autocompleteDiversosRemoto.js"> </script>

<link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />

<link rel="stylesheet" href="../../include/css/css/css3-buttons.css" type="text/css" media="screen">
<link rel="stylesheet" href="../../include/css/tiptip.css" type="text/css"  media="screen">
<script src="../../include/css/jquery.tiptip.js"></script>
<link rel="stylesheet" href="../../include/css/sweetalert2.css" type="text/css">
<script type="text/javascript" src="../../include/js/sweetalert2.js"></script>
-->	
<style type="text/css">

	a:link {
		text-decoration: none;
	}
	a:visited {
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	a:active {
		text-decoration: none;
	}



</style></head>
<body>
<form  action="" method="post" id="forma" name="forma">
<input type="hidden" name="ejercicio" id="ejercicio" value="<c:out value='${ejercicio}'/>">
<input type="hidden" name="clavePedido" id="clavePedido" >
	<div class="row col-md-offset-1">
	          <h1 class="h1-encabezado">Pedidos - Listado de Pedidos</h1>
	</div>  
	<!-- Well -->
	<div class="well">
		<!-- Unidad -->
		<div class="form-group row">
          <label for="grupo" class="col-md-2 control-label">Unidad:</label>
          <div class="col-md-5">
   			<sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
      		<c:out value="${nombreUnidad}"/><input type="hidden" name="cbodependencia" class="form-control input-sm" id="cbodependencia" value='<c:out value="${idUnidad}"/>' />
      		</sec:authorize>
       		<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
       			<select name="cbodependencia" class="form-control input-sm" id="cbodependencia">
            		<option value="0" <c:if test='${item.ID==0}'> selected </c:if>>[Todas la Unidades Administrativas]</option>
            		<c:forEach items="${unidadesAdmiva}" var="item" varStatus="status"> 
              		<option value='<c:out value="${item.ID}"/>' <c:if test='${item.ID==idUnidad}'> selected </c:if>><c:out value='${item.DEPENDENCIA}'/></option>
              		</c:forEach>
          		</select>
          	
      	  	</sec:authorize>
          </div>
          <div class="col-md-1">
          		<input type="checkbox" name="status" id="status"  value="0" <c:if test="${fn:contains(status,'0')}">checked</c:if>>
      			&nbsp;Edici&oacute;n
          </div>
		 <div class="col-md-1">
		 	<input type="checkbox" name="status" id="status"  value="1" <c:if test="${fn:contains(status,'1')}">checked</c:if>>
      			&nbsp;Cerrado
		 </div>
		  <div class="col-md-1">
		 	<input name="status" type="checkbox" id="status"  value="4" <c:if test="${fn:contains(status,'4')}">checked</c:if>>&nbsp;Pedido por OP
		 </div>
        </div> 
        <!-- Termina Unidad -->	
        <!-- Tipo de gasto -->
        <div class="form-group row">
          <label for="grupo" class="col-md-2 control-label">Tipo de gasto:</label>
          <div class="col-md-5">
   			<select name="cbotipogasto" class="form-control input-sm" id="cbotipogasto">
			      <option value="0">[Todos los tipos de gastos]</option>
			      <c:forEach items="${tipodeGasto}" var="item" varStatus="status">
			        <option value='<c:out value="${item.ID}"/>' <c:if test='${item.ID==tipo_gto}'> selected</c:if>><c:out value='${item.RECURSO}'/></option>
			      </c:forEach>
  			  </select>
          </div>
          <div class="col-md-1">
          	<input type="checkbox" name="status" id="status"  value="3" <c:if test="${fn:contains(status,'3')}">checked</c:if>>&nbsp;Cancelado
   		  </div>
          <div class="col-md-1">
          		<input name="status" type="checkbox" id="status"  value="5" <c:if test="${fn:contains(status,'5')}">checked</c:if>>&nbsp;Surtido
          </div>
          <div>
           	<input name="btnBuscar" id="btnBuscar" type="button" class="btn btn-buscar" value="Buscar"/>
  	      </div>
      	</div> 
      	<!-- Termina Tipo de gasto -->
      	<!-- Beneficiario -->
      	<div class="form-group row">
          <label for="grupo" class="col-md-2 control-label">Beneficiario:</label>
          <div class="col-md-5">
   				<select name="cboprestadorservicio" class="selectpicker form-control input-sm" data-live-search="true" data-size="10" title="Seleccione un Beneficiario..." id="cboprestadorservicio" style="width:100%">
                              <c:forEach items="${beneficiarios}" var="item" varStatus="status">
                                    <option value='<c:out value="${item.CLV_BENEFI}"/>'
                                    <c:if test='${item.CLV_BENEFI==cboprestadorservicio}'>selected</c:if>><c:out value='${item.NCOMERCIA}'/>
                              </c:forEach>
             	</select>
      		<input type="hidden" id="CVE_BENEFI" name="CVE_BENEFI" value="<c:out value='${CVE_BENEFI}'/>" />
          </div>
          <div class="col-md-offset-2 col-md-1">
          		<input name="cmdpdf" id="cmdpdf" title="Mostrar listado en formato PDF" type="button" class="btn btn-imprimir" value="Imprimir PDF"/>
          </div>
      	</div> 
      	<!-- Termina Beneficiario -->
      	<!-- CAPITULO -->
      	<div class="form-group row">
          <label for="grupo" class="col-md-2 control-label">Capitulo:</label>
          <div class="col-md-5">
   			<select name="cbocapitulo" class="form-control input-sm"  id="cbocapitulo">
				<option value="0"> [Todos los capitulos]</option>
			    	<c:forEach items="${capitulos}" var="item" varStatus="status">
			        <option value='<c:out value="${item.CLV_CAPITU}"/>' 
			          <c:if test='${item.CLV_CAPITU==cbocapitulo}'> selected </c:if>>
			          <c:out value='${item.CLV_CAPITU}'/>
			          -
			          <c:out value='${item.CAPITULO}'/>
			     	</option>
			      </c:forEach>
    		</select>
          </div>
          <div class="col-md-2">
          		<input type="checkbox" name="verUnidad" id="verUnidad" value="1"  <c:if test='${verUnidad==1}'>  checked </c:if>>Incluir documentos de  la Unidad
          </div>
      	</div> 
      	<!--Termina CAPITULO -->	
      	<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODOS_LOS_DOCUMENTOS_DE_LA_UNIDAD">
	      	<!-- ADICIONAL -->
	      	<div class="form-group row">
	          <label for="grupo" class="col-md-2 control-label">Adicional:</label>
	          <div class="col-md-5">
	   			<select name="cboconOP" class="form-control" id="cboconOP" style="width:447px;">
	      			<option value="0" <c:if test='${0==cboconOP}'> selected </c:if>>[Todas las opciones]</option>
	      			<option value="1" <c:if test='${1==cboconOP}'> selected </c:if>>Con Facturas</option>
	      			<option value="2" <c:if test='${2==cboconOP}'> selected </c:if>>Sin Facturas</option>
	    		</select>
	    		
	          </div>
	        </div> 
	      	<!--TERMINA ADICIONAL -->
	      	<!-- ADICIONAL -->
	      	<div class="form-group row">
		          <label for="grupo" class="col-md-2 control-label">En almacen:</label>
		          <div class="col-md-5">
		   			 <select name="cboalmacen" class="form-control" id="cboalmacen" style="width:223px;">
				        <option value="0" <c:if test='${0==cboalmacen}'> selected </c:if>> [Seleccionar]</option>
				        <option value="1" <c:if test='${1==cboalmacen}'> selected </c:if>> Todos</option>
				        <optgroup label="Con Entradas">
				        	<option value="2" <c:if test='${2==cboalmacen}'> selected </c:if>> Completadas</option>
				          	<option value="3" <c:if test='${3==cboalmacen}'> selected </c:if>> Incompletas</option>
				        </optgroup>
				     </select>
		    	   </div>
	        </div> 
	      	<!--TERMINA ADICIONAL -->
	      	<!-- RANGO DE FECHAS DE FILTRADO -->
	      	<div class="form-group row">
	         	<label for="grupo" class="col-md-2 control-label">Por fecha de:</label>
	          	<div class="col-md-1">
	   				<input type="text" name="fechaInicial" id="fechaInicial" value="${fechaInicial}" size="12"maxlength="10" class="form-control input-sm" style="width:100px"  id="inputKey" placeholder="Desde">
			  	</div>
	     	 	<div class="col-md-1">
	   				<input type="text" name="fechaFinal"  id="fechaFinal" value="${fechaFinal}" size="12"  maxlength="10" class="form-control input-sm" style="width:100px"  id="inputValue" placeholder="Hasta">
	     	 	</div>
	     	</div> 
	     	<!-- TERMINA RANGO DE FECHAS DE FILTRADO -->
	     	<!-- Num. Pedido  Y NUM. REQUISICION-->
	     	<div class="form-group row">
	          <label for="txtnumop" class="col-md-2 control-label">Núm. Pedido:</label>
	          <div class="col-md-2">
	   				<input name="txtpedido" type="text"  id="txtpedido" maxlength="50"  placeholder="Núm. Pedido" class="form-control input-sm" value="<c:out value='${txtpedido}'/>">
	     	  </div>
	     	   	<!--<label for="txtpedido" class="col-md-1 control-label">Núm. Pedido:</label>  -->
	     	  <div class="col-md-2">
	     	  		<input name="txtrequisicion" class="form-control input-sm" type="text" id="txtrequisicion" placeholder="Núm. Pedido" maxlength="50"  value="<c:out value='${txtrequisicion}'/>">
	     	  </div>	
	     	   
     		</div> 
     		<!-- Num. Pedido -->
      	</sec:authorize>
	</div>
	<!-- Cierre Well -->
<br />
<table width="95%" class="table table-sm table-hover table-responsive" align="center" id="listaRequisiciones" cellpadding="0" cellspacing="0">
 <thead>
  <tr>
    <th width="3%" height="20">&nbsp;</th>
    <th width="9%">N&uacute;mero</th>
    <th width="9%">Fecha</th>
    <th width="6%">Estado</th>
    <th width="40%">Unidad Administrativa</th>
    <th width="4%">Almacén</th>
    <th width="9%">Requisición</th>
    <th width="9%">Importe</th>
    <th width="7%">Opciones</th>
  </tr>
   </thead>   
<tbody> 
<c:set var="cont" value="${0}" /> 
<c:forEach items="${listadoPedidos}" var="item" varStatus="status"> 
  <tr>
    <tr>
      <td align="center">
	     <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_APERTURAR_PEDIDOS">&nbsp;
		    <c:if test='${item.STATUS==1||item.STATUS==0}'>
		    	<input type="checkbox" alt="<c:out value='${item.NUM_PED}'/>" id="chkpedidos" name="chkpedidos" value="<c:out value='${item.CVE_PED}'/>"/>
		    </c:if>
	    
	    </sec:authorize>
    </td>
    <td align="center"><sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_SUBMENU_ESPECIAL_EN_LISTADO_PEDIDOS"><a href="javascript:subOpAdm('ped', <c:out value='${item.CVE_PED}'/>, <c:out value='${item.CVE_PERS}'/>)"></sec:authorize><c:out value='${item.NUM_PED}'/><sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_SUBMENU_ESPECIAL_EN_LISTADO_PEDIDOS"></a></sec:authorize></td>
    <td align="center"><c:out value='${item.FECHA_PED}'/></td>
    <td align="center"><c:out value='${item.STATUS_DESC}'/></td>
    <td><c:out value='${item.UNIDAD}'/></td>
    <td align="center"><c:out value='${item.ALMACEN}'/></td>
    <td align="center"><c:out value='${item.NUM_REQ}'/></td>
    <td align="right"><fmt:formatNumber value="${item.TOTAL}"  pattern="#,###,###,##0.00" /> </td>
    <td align="center">
    <c:if test='${item.STATUS!=3}'>
    	<img style="cursor:pointer" src="../../imagenes/pdf.gif" title="Ver Documento" border="0" width="14" height="16" onClick="getReportePedido(<c:out value='${item.CVE_PED}'/>)">
    </c:if> 
    <c:if test='${item.STATUS==3}'>
    	<img src="../../imagenes/pdf2.png" border="0" width="14" height="16">
    </c:if>
    
    <sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_SOLO_IMPRESION_GENERAL">
        <c:if test='${item.STATUS==0}'>
        <img src="../../imagenes/page_white_edit.png" title="Editar / Abrir" style="cursor:pointer" onClick="editarPedido(<c:out value='${item.CVE_PED}'/>, <c:out value='${item.STATUS}'/>)">
        </c:if>
        <c:if test='${item.STATUS!=0}'>
        <img src="../../imagenes/page_gray_edit.png">
        </c:if>
        <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_CANCELAR_PEDIDOS">
            <c:if test='${item.STATUS==0||item.STATUS==1}'>
                <img style="cursor:pointer" src="../../imagenes/cross.png" title="Cancelar Pedido" border="0" width="16" height="16" onClick="cancelarPedido(<c:out value='${item.CVE_PED}'/>)">     
            </c:if>
            <sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_REACTIVAR_PEDIDOS">
                <c:if test='${item.STATUS!=0&&item.STATUS!=1&&item.STATUS!=2}'>
                    <img src="../../imagenes/cross2.png" border="0" width="16" height="16">     
                </c:if>
            </sec:authorize>
            <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_REACTIVAR_PEDIDOS">
                 <c:if test='${item.STATUS==3}'>
                    <img style="cursor:pointer" src="../../imagenes/accept.png" title="Reactivar Pedido" border="0" width="16" height="16" onClick="reactivarPedido(<c:out value='${item.CVE_PED}'/>)">
                </c:if>
            </sec:authorize>
        </sec:authorize>
        <c:if test='${item.STATUS==5}'>
               <img src="../../imagenes/cross2.png" border="0" width="16" height="16">     
         </c:if>
    </sec:authorize>
    
    
    </td>
    <c:set var="cont" value="${cont+1}"/> 
  </tr>
  </c:forEach>
   <c:if test="${fn:length(listadoPedidos) > 0}"> 
      <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_APERTURAR_PEDIDOS">
        <tr>
        <td colspan="9" align="left" height="40" style="background-color:#FFF">
        <table width="269" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <c:if test="${fn:contains(status,'1')||fn:contains(status,'2')}">
              <td width="130" bgcolor="#FFFFFF"><div class="buttons tiptip">
              	<input type="button" name="cmdaperturar" id="cmdaperturar2" value="Aperturar" data-toggle="tooltip" title="Apertura para editar los documentos seleccionados" class="btn btn-warning">
                
              </div></td>
            </c:if>
            <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_CANCELAR_REQUISICIONES">
              <td width="139" bgcolor="#FFFFFF"><div class="buttons tiptip">
                <input type="button" name="cmdcancelarm" id="cmdcancelarm2" data-toggle="tooltip" title="Cancela los documentos seleccionados" class="btn btn-danger" value="Cancelar">
              </div></td>
            </sec:authorize>
          </tr>
        </table></td>
        </tr> 
        </sec:authorize> 
        <tr>
          <td colspan="9" height="25" style="background-color:#FFF" align="left"><strong>Total de registros encontrados: <c:out value='${CONTADOR}'/></strong></td>
        </tr> 
     
   </c:if>
  </tbody>  
</table>
</form>
</body>
</html>
