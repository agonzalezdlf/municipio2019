<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Listado de Vales Finanzas</title>


<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js?x=<%=System.currentTimeMillis()%>"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-select.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-select.js"></script>	
<script type="text/javascript" src="../../include/js/toolsamV20.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="lista_vales.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../dwr/interface/controladorListadoValesRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"></script>
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>

<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/core-js-2.4.1.js"></script>

<body >
<form  action="lista_vales_finanzas.action" method="POST" id="forma" name="forma">
<input type="hidden" name="ejercicio" id="ejercicio" value="<c:out value='${ejercicio}'/>">
<input type="hidden" name="cve_val" id="cve_val" >

<div class="row col-md-offset-1">
	<h1 class="h1-encabezado">Vales - Listado de Vales Finanzas</h1>
</div> 
<div class="well">
	<div class=row>
		<div class="form-group">
			<div class="control-label col-sm-3">Unidad:</div>
			<div class="col-sm-5 form-group">
                 <select name="cbodependencia" class="selectpicker form-control input-sm m-b" title="Seleccione una Unidad..." data-live-search="true" id="cbodependencia" style="width:70%">
                 <option value="0">[Todas la Unidades Administrativas]</option>
                     <c:forEach items="${unidadesAdmiva}" var="item" varStatus="status">                  
                       <option value='<c:out value="${item.ID}"/>'
                       	<c:if test='${item.ID==idUnidad}'>selected</c:if>><c:out value='${item.DEPENDENCIA}'/>
                       </option>
                     </c:forEach>
                 </select>
            </div>
		</div>
	</div>
	<!-- Tipo de Gasto-->
    <div class="row">
       <div class="form-group">
         <div class="control-label col-sm-3">*Tipo de Gasto:</div>
         <div class="col-sm-5 form-group">
             <select name="cbotipogasto" class="selectpicker form-control input-sm m-b" data-live-search="true" title="Seleccione Recurso..." id="cbotipogasto" style="width:70%">
                 <c:forEach items="${tipodeGasto}" var="item" varStatus="status">                  
                 	<option value='<c:out value="${item.ID}"/>'
                   	<c:if test='${item.ID==cbotipogasto}'>selected</c:if>><c:out value='${item.RECURSO}'/>
                   </option>
                 </c:forEach>
             </select>
         </div>
       </div>
     </div>
     <!--Beneficiario-->
     <div class="row">
       <div class="form-group">
           <div class="control-label col-sm-3 ">Seleccione un Beneficiario:</div>
           <div class="form-group col-sm-5">
               <select name="cboprestadorservicio" class="selectpicker form-control input-sm m-b" data-live-search="true" id="cboprestadorservicio" title="Seleccione Beneficiario..." style="width:100%">
                 <c:forEach items="${beneficiarios}" var="item" varStatus="status">
                       <option value='<c:out value="${item.CLV_BENEFI}"/>'
                       <c:if test='${item.CLV_BENEFI==CVE_BENEFI}'>selected</c:if>><c:out value='${item.NCOMERCIA}'/>
                 </c:forEach>
               </select>
           </div>
           
       </div>
     </div>
     <!-- Estatus del vale-->
     <div class="row">
       <div class="form-group">
         <div class="control-label col-sm-3">Estatus:</div>
         <div class="col-sm-5 form-group">
             <select name="cbostatus" class="selectpicker form-control input-sm m-b" data-live-search="true" title="Seleccione Status..." id="cbostatus" style="width:100%">
                       
                 <option value="1" <c:if test='${cbostatus==1}'>selected</c:if>>Pendientes Pago</option>
                 <option value="3" <c:if test='${cbostatus==3}'>selected</c:if>>Aprobado</option>
                 <option value="4" <c:if test='${cbostatus==4}'>selected</c:if>>Pagado</option>
                
             </select>
         </div>
       </div>
     </div>
    
</div>
<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODOS_LOS_DOCUMENTOS_DE_LA_UNIDAD"></sec:authorize>  
<br />
<div class="row" style="margin: 0 auto !important;float: none !important;">
	<table class="table table-sm table-hover table-responsive"  id="listaRequisiciones">
	 <thead>
	  <tr>
	    <th width="3%" height="20">&nbsp;</th>
	    <th width="6%">Número</th>
	    <th width="5%">Fecha</th>    
	    <th width="32%">Beneficiario</th>
	    <th width="13%">Tipo</th>
	    <th>Tipo de Gasto</th>
	    <th width="11%">Importe</th>    
	    <th width="5%">Opciones</th>
	  </tr>
	   </thead>   
	<tbody>  
	<c:set var="cont" value="${0}" />
	<c:forEach items="${vales}" var="item" varStatus="status"> 
	 <tr id='f<c:out value="${cont}"/>' onMouseOver="color_over('f<c:out value="${cont}"/>')" onMouseOut="color_out('f<c:out value="${cont}"/>')">
	    <td align="center"><input type="checkbox" id="chkvales" name="chkvales" value="<c:out value='${item.CVE_VALE}'/>"/></td>
	    <td align="center"><c:out value='${item.NUM_VALE}'/></td>
	    <td align="center"><c:out value='${item.FECHA}'/></td>
	    <td><c:out value='${item.NCOMERCIA}'/></td>
	    <td align="center"><c:out value='${item.DESCRIPCION_ESTATUS}'/></td>
	    <td align="center"><c:out value='${item.RECURSO}'/></td>
	    <td align="right"><fmt:formatNumber value="${item.TOTAL}"  pattern="#,###,###,##0.00" /> </td>
	    <td align="center">
	    <img style="cursor:pointer" src="../../imagenes/pdf.gif" alt="Ver Documento" border="0" width="14" height="16" onClick="getReporteVale(<c:out value='${item.CVE_VALE}'/>)">&nbsp;
	    <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_BITACORA_EN_VALES">
	    	<img src="../../imagenes/report_user.png" alt="" width="16" height="16" border="0" style="cursor:pointer" title="Ver bitacora de Vales" onClick="bitacoraDocumento(<c:out value='${item.CVE_VALE}'/>, 'VAL')">
	    </sec:authorize>
	    </td>
	  </tr>
	  <c:set var="cont" value="${cont+1}" />
	  </c:forEach> 
		 <c:if test="${fn:length(vales) > 0}">  
		  <tr>
		    <td colspan="8" align="left" height="30" style="background:#FFF">
		    	<c:if test="${fn:contains(cbostatus,'1')}" >
		    		<input type="button" value="Aplicar pago" id="cmdaplicar" name="cmdaplicar" class="btn btn-success"  style="width:150px"/> 
		    		<input type="button" value="Rechazar" id="cmdrechazar" name="cmdrechazar" class="btn btn-danger"   style="width:150px"/>
		    	</c:if> 
		    	<c:if test="${fn:contains(cbostatus,'4')}" >
		      		<input type="button" value="Desaplicar pago" id="cmdaperturar2" class="btn btn-danger" onClick="desAplicarVale()" style="width:150px"/>
		    	</c:if> 
		    </td>
		  </tr>
		 </c:if>  
	  </tbody>  
	</table>
</div>

<div class="alert alert-info">
	<strong>Total de registros encontrados: <c:out value='${cont}'/></strong>
</div>
</form>
</body>
</html>
